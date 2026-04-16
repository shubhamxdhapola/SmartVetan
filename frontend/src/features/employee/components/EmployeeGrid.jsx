import { useSelector } from "react-redux";
import EmployeeCard from "../../../components/cards/EmployeeCard";
import { employees } from "../../../utils/data";

const EmployeeGrid = () => {
  const { employees } = useSelector((state) => state.employee);
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {employees?.map((employee) => (
        <EmployeeCard key={employee._id} employee={employee} />
      ))}
    </section>
  );
};

export default EmployeeGrid;
