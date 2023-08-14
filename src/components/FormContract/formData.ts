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
    placeholder: "Seleccionar exportador",
    title: "Exportador:",
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
    placeholder: "Seleccionar importador",
    title: "Importador:",
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
    placeholder: "Nombre de contrato",
    title: "Nombre de contrato:",
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
    placeholder: "Seleccionar producto",
    title: "Producto:",
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
    placeholder: "Seleccionar tipo",
    title: "Tipo:",
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
    placeholder: "Seleccionar calibre",
    title: "Calibre:",
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
    placeholder: "Agregar año de cosecha",
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
    placeholder: "Seleccionar packaging",
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
    placeholder: "Cantidad de toneladas",
    title: "Toneladas:",
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
    placeholder: "Escribe sólo el número",
    title: "Margen de error (%):",
    name: "margenPercentage",
    value: "",
    type: "number",
    formatValue: (value: any) => Number(value),
    cols: "c-col-span-6",
  },
  {
    icon: BrokerIcon,
    key: "broker",
    placeholder: "Broker",
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
    placeholder: "Comisión del Broker (%)",
    title: "Porcentaje:",
    name: "brokerPercent",
    value: "",
    type: "number",
    cols: "c-col-span-6",
  },
  {
    icon: PriceIcon,
    key: "price",
    placeholder: "Precio x ton",
    title: "Precio:",
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
    placeholder: "Currency",
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
    placeholder: "Payment Method",
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
    placeholder: "Seleccionar surveyor",
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
    placeholder: "Agregar seguro",
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
    title: "Agregar destino:",
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
    placeholder: "Ej: FCA General Deheza",
    title: "Sales Conditions:",
    name: "salesConditions",
    value: "",
    type: "text",
    cols: "c-col-span-6",
  },
  {
    icon: ConditionsIcon,
    key: "specifications",
    placeholder: "Agregar condiciones",
    title: "Condiciones:",
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
    placeholder: "Agregar documentos",
    title: "Documentos:",
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
