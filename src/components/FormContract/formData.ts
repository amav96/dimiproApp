import { GlobalInputs, Slot } from '../package/Form/Form.type';

import ExporterIcon from '../../public/icons/form/exporter.svg';
import ProductIcon from '../../public/icons/form/product.svg';
import TypeIcon from '../../public/icons/form/type.svg';
import CaliberIcon from '../../public/icons/form/caliber.svg';
import CropIcon from '../../public/icons/form/calendar.svg';
import PackagingIcon from '../../public/icons/form/packaging.svg';
import QtyIcon from '../../public/icons/form/weight.svg';
import BrokerIcon from '../../public/icons/form/broker.svg';
import PercentageIcon from '../../public/icons/form/percentage.svg';
import PriceIcon from '../../public/icons/form/price.svg';
import CoinIcon from '../../public/icons/form/coin.svg';
import PaymentMethodIcon from '../../public/icons/form/payment-method.svg';
import SurveyorIcon from '../../public/icons/form/surveyor.svg';
import ConditionsIcon from '../../public/icons/form/conditions.svg';
import FileIcon from '../../public/icons/form/file.svg';

export const formData: Array<GlobalInputs | Slot> = [
  {
    icon: ExporterIcon,
    key: "exporter",
    name: "exporter",
    value: [],
    type: "select",
    multiple: false,
    clearable: true,
    trackBy: '_id',
    placeholder: "Select exporter",
    title: "Exporter:",
    formatValue: (value: any) => value?._id,
    validations: {
      rules: {
        required: true,
      },
    },
    options: [],
    cols: "c-col-span-6",
  },
  {
    icon: ExporterIcon,
    key: "importer",
    name: "importer",
    value: [],
    type: "select",
    multiple: false,
    clearable: true,
    trackBy: '_id',
    placeholder: "Select importer",
    title: "Importer:",
    formatValue: (value: any) => value?._id,
    validations: {
      rules: {
        required: true,
      },
    },
    options: [],
    cols: "c-col-span-6",
  },
  {
    icon: CropIcon,
    key: "name",
    placeholder: "Enter the contract name",
    title: "Contract Name:",
    name: "name",
    value: "",
    type: "text",
    validations: {
      rules: {
        required: true,
      },
    },
    cols: "c-col-span-6",
  },
  {
    icon: ProductIcon,
    key: "product",
    name: "product",
    value: [],
    type: "select",
    multiple: false,
    clearable: true,
    trackBy: '_id',
    placeholder: "Select product",
    title: "Product:",
    formatValue: (value: any) => value?._id,
    validations: {
      rules: {
        required: true,
      },
    },
    options: [],
    cols: "c-col-span-6",
  },
  {
    icon: TypeIcon,
    key: "category",
    name: "category",
    value: [],
    type: "select",
    multiple: false,
    clearable: true,
    trackBy: '_id',
    placeholder: "Select product type",
    title: "Product Type:",
    formatValue: (value: any) => value?._id,
    validations: {
      rules: {
        required: true,
      },
    },
    options: [],
    cols: "c-col-span-6",
  },
  {
    icon: CaliberIcon,
    key: "calibers",
    name: "calibers",
    value: [],
    type: "select",
    multiple: true,
    clearable: true,
    trackBy: '_id',
    placeholder: "Select calibers",
    title: "Calibers:",
    formatValue : (value: any[]) => value.map((v:any) => v.id ?? v._id),
    validations: {
      rules: {
        required: true,
      },
    },
    options: [],
    cols: "c-col-span-6",
  },
  {
    icon: CropIcon,
    key: "crop",
    placeholder: "Add crop year",
    title: "Crop:",
    name: "crop",
    value: "",
    type: "text",
    validations: {
      rules: {
        required: true,
      },
    },
    cols: "c-col-span-6",
  },
  {
    icon: PackagingIcon,
    key: "packaging",
    name: "packaging",
    value: [],
    type: "select",
    multiple: false,
    clearable: true,
    trackBy: '_id',
    placeholder: "Select packaging",
    title: "Packaging:",
    formatValue: (value: any) => value?._id,
    validations: {
      rules: {
        required: true,
      },
    },
    options: [],
    cols: "c-col-span-6",
  },
  {
    icon: QtyIcon,
    key: "quantity",
    placeholder: "Number of tons",
    title: "Tons:",
    name: "quantity",
    value: "",
    type: "number",
    formatValue: (value: any) => Number(value),
    validations: {
      rules: {
        required: true,
      },
    },
    cols: "c-col-span-6",
  },
  {
    icon: QtyIcon,
    key: "margenPercentage",
    placeholder: "Enter only the number",
    title: "Error margin (%):",
    name: "margenPercentage",
    value: "",
    type: "number",
    formatValue: (value: any) => Number(value),
    cols: "c-col-span-6",
  },
  {
    icon: BrokerIcon,
    key: "broker",
    placeholder: "Select broker",
    title: "Broker:",
    name: "broker",
    value: [],
    type: "select",
    formatValue: (value: any) => value?._id,
    options: [],
    cols: "c-col-span-6",
  },
  {
    icon: PercentageIcon,
    key: "brokerPercent",
    placeholder: "Broker's commission (%)",
    title: "Broker's commission:",
    name: "brokerPercent",
    value: "",
    type: "number",
    cols: "c-col-span-6",
  },
  {
    icon: PriceIcon,
    key: "price",
    placeholder: "Enter the price per ton",
    title: "Price per ton:",
    name: "price",
    value: "",
    type: "number",
    validations: {
      rules: {
        required: true,
      },
    },
    cols: "c-col-span-6",
  },
  {
    icon: CoinIcon,
    key: "currency",
    placeholder: "Select currency",
    title: "Currency:",
    name: "currency",
    value: [],
    type: "select",
    trackBy: '_id',
    formatValue: (value: any) => value?._id,
    validations: {
      rules: {
        required: true,
      },
    },
    options: [],
    cols: "c-col-span-6",
  },
  {
    icon: PaymentMethodIcon,
    key: "paymentMethod",
    placeholder: "Select payment method",
    title: "Payment Method:",
    name: "paymentMethod",
    value: [],
    type: "select",
    trackBy: '_id',
    formatValue: (value: any) => value?._id,
    validations: {
      rules: {
        required: true,
      },
    },
    options: [],
    cols: "c-col-span-6",
  },
  {
    icon: SurveyorIcon,
    key: "surveyor",
    placeholder: "Select surveyor",
    title: "Surveyor:",
    name: "surveyor",
    value: [],
    type: "select",
    trackBy: '_id',
    formatValue: (value: any) => value?._id,
    options: [],
    validations: {
      rules: {
        required: true,
      },
    },
    cols: "c-col-span-6",
  },
  {
    icon: CropIcon,
    key: "insurance",
    placeholder: "Enter insurance",
    title: "Insurance:",
    name: "insurance",
    value: "",
    type: "text",
    cols: "c-col-span-6",
  },
  {
    icon: CropIcon,
    key: "shippingDate",
    placeholder: "Ej: December 2023",
    title: "Shipping Date:",
    name: "shippingDate",
    value: "",
    type: "text",
    validations: {
      rules: {
        required: true,
      },
    },
    cols: "c-col-span-6",
  },
  {
    icon: CropIcon,
    key: "destination",
    placeholder: "Ej: Livorno - Italy",
    title: "Add Destination:",
    name: "destination",
    value: "",
    type: "text",
    validations: {
      rules: {
        required: true,
      },
    },
    cols: "c-col-span-6",
  },
  {
    icon: CropIcon,
    key: "salesConditions",
    placeholder: "Ej: FCA - General Deheza",
    title: "Sales Conditions:",
    name: "salesConditions",
    value: "",
    type: "text",
    cols: "c-col-span-6",
  },
  {
    icon: ConditionsIcon,
    key: "specifications",
    placeholder: "Enter specifications",
    title: "Specifications:",
    name: "specifications",
    value: "",
    type: "textarea",
    validations: {
      rules: {
        required: true,
      },
    },
    cols: "c-col-span-6",
  },
  {
    icon: FileIcon,
    key: "documents",
    placeholder: "Add documents",
    title: "Documents:",
    name: "documents",
    value: "",
    type: "file",
    validations: {
      rules: {
        required: true,
      },
    },
    cols: "c-col-span-6",
  },
];
