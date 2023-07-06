import { formatDateTime } from "@services/utils/Formatters";

export const dataTable = [
  { key: "name", title: "Name" },
  {
    key: "product",
    title: "Product",
    format: (value: any) => value.name,
  },
  {
    key: "exporter",
    title: "Exporter",
    format: (value: any) => value.name,
  },
  {
    key: "importer",
    title: "Importer",
    format: (value: any) => value.name,
  },
  {
    key: "broker",
    title: "Broker",
    format: (value: any) => (value.name ? value.name : "s/n"),
  },
  {
    key: "brokerPercent",
    title: "Broker (%)",
    format: (value: any) => (value ? value : "s/n"),
  },
  {
    key: "category",
    title: "Type",
    format: (value: any) => value.name,
  },
  {
    key: "calibers",
    title: "Caliber",
    format: (value: any) => {
      return value.map((caliber: any) => caliber.name);
    },
  },
  {
    key: "crop",
    title: "Crop",
    format: (value: any) => {
      const dateStr = value;
      const date = new Date(dateStr);
      return date.getFullYear() ? date.getFullYear() : "s/n";
    },
  },
  {
    key: "quantity",
    title: "Quantity (TN)",
  },
  {
    key: "packaging",
    title: "Packaging",
    format: (value: any) => value.name,
  },
  {
    key: "currency",
    title: "Currency",
    format: (value: any) => value.name,
  },
  {
    key: "paymentMethod",
    title: "Payment Method",
    format: (value: any) => value.name,
  },
  {
    key: "price",
    title: "Price",
  },
  {
    key: "surveyor",
    title: "Surveyor",
    format: (value: any) => value.name,
  },
  {
    key: "specifications",
    title: "Specifications",
  },
  {
    key: "createdAt",
    title: "created",
    format: (value: string) => formatDateTime(value) || "",
  },
  {
    key: "pdf",
    title: "PDF",
    format: (value: any) => {
      return <a href={value}>View pdf</a>;
    },
  },
  { key: "edit", title: "Edit" },
  { key: "delete", title: "Delete" },
];
