import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
//strip route after creating the useSubsciption modal in prisma
import { absoluteUrl } from "@/lib/utils";
// import { describe } from "node:test";

const settingsUrl = absoluteUrl("/settings");

export async function GET() {
  try {
    const { userId } = auth();
    const user = await currentUser();

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userSubscription = await prismadb.userSubscription.findUnique({
      where: { userId },
    });

    if (userSubscription && userSubscription.stripeCustomerId) {
      //once user have subsciption , we want to direct the user to the billing page
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl,
      });

      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }

    //if we don't have stripe subscription , we wanna open another form of stripe session
    //open checkout session because it is user first time subscriping in our application
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_id: {
              name: "WebSync Pro",
              description: "Unlimited AI Generations",
            },
            unit_amount: 2000,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
          price: 2000,
        },
      ],
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      metadata: {
        userId, //this checkout which just completed succ, belongs to this userId
      },
    });
    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (err) {
    console.log("[STRIPE_ERROR]", err);
    return new NextResponse("internal error", { status: 500 });
  }
}
