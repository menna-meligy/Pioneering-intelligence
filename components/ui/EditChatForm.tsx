import { useState, FormEvent } from "react";
import { useRouter } from "next/router";

interface EditTopicFormProps {
  id: string;
  name: string;
}

export default function EditTopicForm({ id, name }: EditTopicFormProps) {
  const [newTitle, setNewTitle] = useState<string>(name);
//   const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3001/api/chat/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newTitle }),
      });

      if (!res.ok) {
        throw new Error("Failed to update topic");
      }

    //   router.refresh();
    //   router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Title"
      />
      <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
        Update Chat
      </button>
    </form>
  );
}
