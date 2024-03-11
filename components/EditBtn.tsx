import { useState } from "react";
import { HiPencilAlt, HiCheck } from "react-icons/hi";

interface EditBtnProps {
  id: string;
  name: string;
  onUpdate: (newName: string) => void;
}

const EditBtn: React.FC<EditBtnProps> = ({ id, name, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);

  const handleUpdate = () => {
    onUpdate(newName);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div className="flex items-center">
          <input
            className="border border-slate-500 px-2 py-1 mr-2"
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <HiCheck
            size={24}
            className="text-green-500 cursor-pointer"
            onClick={handleUpdate}
          />
        </div>
      ) : (
        <div className="flex items-center">
          <div className="border border-slate-500 px-2 py-1 mr-2">{newName}</div>
          <HiPencilAlt
            size={24}
            className="text-blue-500 cursor-pointer"
            onClick={() => setIsEditing(true)}
          />
        </div>
      )}
    </div>
  );
};

export default EditBtn;
