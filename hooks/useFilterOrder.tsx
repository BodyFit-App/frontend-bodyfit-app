import { useState } from "react";

export const useFilterOrder = () => {
  const filterList = ["Plus récents", "Moins récents", "A-Z", "Z-A"];
  const [order, setOrder] = useState<{
    field: "created_at" | "title";
    asc: boolean;
  }>({
    field: "created_at",
    asc: false,
  });

  const handleFilterChange = (selectedFilter: string) => {
    switch (selectedFilter) {
      case "Plus récents":
        setOrder({ field: "created_at", asc: false });
        break;
      case "Moins récents":
        setOrder({ field: "created_at", asc: true });
        break;
      case "A-Z":
        setOrder({ field: "title", asc: true });
        break;
      case "Z-A":
        setOrder({ field: "title", asc: false });
        break;
      default:
        setOrder({ field: "created_at", asc: false });
    }
  };

  const selectedFilter = (() => {
    if (order.field === "created_at" && order.asc === false)
      return "Plus récents";
    if (order.field === "created_at" && order.asc === true)
      return "Moins récents";
    if (order.field === "title" && order.asc === true) return "A-Z";
    if (order.field === "title" && order.asc === false) return "Z-A";
    return "Plus récents";
  })();

  return {
    selectedFilter,
    order,
    handleFilterChange,
    filterList,
  };
};
