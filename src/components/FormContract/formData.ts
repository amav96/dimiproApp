import { GlobalInputs, Slot } from '../package/Form/Form.type';

import ExporterIcon from '/icons/form/exporter.svg';
import ProductIcon from '/icons/form/product.svg';
import TypeIcon from '/icons/form/type.svg';
import CaliberIcon from '/icons/form/caliber.svg';
import CropIcon from '/icons/form/calendar.svg';
import PackagingIcon from '/icons/form/packaging.svg';
import QtyIcon from '/icons/form/weight.svg';
import BrokerIcon from '/icons/form/broker.svg';
import PercentageIcon from '/icons/form/percentage.svg';
import PriceIcon from '/icons/form/price.svg';
import CoinIcon from '/icons/form/coin.svg';
import PaymentMethodIcon from '/icons/form/payment-method.svg';
import SurveyorIcon from '/icons/form/surveyor.svg';
import ConditionsIcon from '/icons/form/conditions.svg';
import FileIcon from '/icons/form/file.svg';

export const formData: Array<GlobalInputs | Slot> = [
  {
    icon: ExporterIcon,
    key: "exporters",
    name: "exportador",
    value: [],
    type: "select",
    multiple: false,
    clearable: true,
    placeholder: "Seleccionar exportador",
    title: "Exportador:",
    validations: {
      rules: {
        required: true,
      },
    },
    options: [],
  },
  {
    icon: ExporterIcon,
    key: "importers",
    name: "importador",
    value: [],
    type: "select",
    multiple: false,
    clearable: true,
    placeholder: "Seleccionar importador",
    title: "Importador:",
    validations: {
      rules: {
        required: true,
      },
    },
    options: [],
  },
  {
    icon: CropIcon,
    key: "nameContract",
    placeholder: "Nombre de contrato",
    title: "Nombre de contrato:",
    name: "nameContract",
    value: "",
    type: "text",
    validations: {
      rules: {
        required: true,
      },
    },
  },
  {
    icon: ProductIcon,
    key: "products",
    name: "producto",
    value: [],
    type: "select",
    multiple: false,
    clearable: true,
    placeholder: "Seleccionar producto",
    title: "Producto:",
    validations: {
      rules: {
        required: true,
      },
    },
    options: [
      {
        name: "Maní",
        id: 1,
      },
    ],
  },
  {
    icon: TypeIcon,
    key: "categories",
    name: "tipo",
    value: [],
    type: "select",
    multiple: false,
    clearable: true,
    placeholder: "Seleccionar tipo",
    title: "Tipo:",
    validations: {
      rules: {
        required: true,
      },
    },
    options: [],
  },
  {
    icon: CaliberIcon,
    key: "calibers",
    name: "calibre",
    value: [],
    type: "select",
    multiple: false,
    clearable: true,
    placeholder: "Seleccionar calibre",
    title: "Calibre:",
    validations: {
      rules: {
        required: true,
      },
    },
    options: [],
  },
  {
    icon: CropIcon,
    key: "crop",
    placeholder: "Agregar fecha de cosecha",
    title: "Crop:",
    name: "crop",
    value: "",
    type: "text",
    validations: {
      rules: {
        required: true,
      },
    },
  },
  {
    icon: PackagingIcon,
    key: "packagings",
    name: "packagings",
    value: [],
    type: "select",
    multiple: false,
    clearable: true,
    placeholder: "Seleccionar packaging",
    title: "Packaging:",
    validations: {
      rules: {
        required: true,
      },
    },
    options: [],
  },
  {
    icon: QtyIcon,
    key: "tn",
    placeholder: "Cantidad de toneladas",
    title: "Toneladas:",
    name: "tn",
    value: "",
    type: "number",
    validations: {
      rules: {
        required: true,
      },
    },
  },
  {
    icon: BrokerIcon,
    key: "brokers",
    placeholder: "Broker",
    title: "Broker:",
    name: "broker",
    value: "",
    type: "select",
    options: [],
  },
  {
    icon: PercentageIcon,
    key: "porcentaje",
    placeholder: "Comisión del Broker (%)",
    title: "Porcentaje:",
    name: "porcentaje",
    value: "",
    type: "number",
  },
  {
    icon: PriceIcon,
    key: "precio",
    placeholder: "Precio",
    title: "Precio:",
    name: "precio",
    value: "",
    type: "number",
    validations: {
      rules: {
        required: true,
      },
    },
  },
  {
    icon: CoinIcon,
    key: "currencies",
    placeholder: "Seleccionar moneda",
    title: "Moneda:",
    name: "moneda",
    value: "",
    type: "select",
    validations: {
      rules: {
        required: true,
      },
    },
    options: [],
  },
  {
    icon: PaymentMethodIcon,
    key: "paymentMethods",
    placeholder: "Seleccionar metodo de pago",
    title: "Método de pago:",
    name: "metodoPago",
    value: "",
    type: "select",
    validations: {
      rules: {
        required: true,
      },
    },
    options: [],
  },
  {
    icon: SurveyorIcon,
    key: "surveyors",
    placeholder: "Seleccionar surveyor",
    title: "Surveyor:",
    name: "surveyors",
    value: "",
    type: "select",
    validations: {
      rules: {
        required: true,
      },
    },
    options: [],
  },
  {
    icon: ConditionsIcon,
    key: "condiciones",
    placeholder: "Agregar condiciones",
    title: "Condiciones:",
    name: "condiciones",
    value: "",
    type: "textarea",
    validations: {
      rules: {
        required: true,
      },
    },
  },
  {
    icon: FileIcon,
    key: "documentos",
    placeholder: "Agregar documentos",
    title: "Documentos:",
    name: "documentos",
    value: "",
    type: "file",
    validations: {
      rules: {
        required: true,
      },
    },
  },
];
