import { TbArrowBackUp } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)}>
      <TbArrowBackUp size={40} className="text-accent" />
    </button>
  );
};

export default BackButton;
