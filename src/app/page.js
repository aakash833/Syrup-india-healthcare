import Image from "next/image";
import MaterialForm from "./components/material-form";
import StockUpdateForm from "./components/stock-update";
import InventoryTable from "./components/inventory-table";

export default function Home() {
  return (
    <main className="container mb-12">
      <h1 className="text-2xl font-bold my-7">Material Management</h1>
      <div className="space-y-6 ">
        <MaterialForm />
        <StockUpdateForm />
        <div className="overflow-x-auto">
          {" "}
          {/* Added overflow-x-auto for horizontal scrolling */}
          <div className="inline-block min-w-full">
            {" "}
            {/* Ensures the table takes full width */}
            <InventoryTable />
          </div>
        </div>
      </div>
    </main>
  );
}
