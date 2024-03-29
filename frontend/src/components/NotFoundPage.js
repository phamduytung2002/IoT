import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { PATHS } from "../routes/PATHS";

export function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate(PATHS.HOME), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex text-red-500 grow items-center justify-center">
      <h1>
        404 - Trang web không tồn tại. Chuyển sang trang trước trong vòng 3s...
      </h1>
    </div>
  );
}
