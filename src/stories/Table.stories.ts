import type { Meta, StoryObj } from "@storybook/react";
import { ChipProps, darken, lighten } from "@mui/material";

import EnhancedTable from "../components/Table";
import {
  FilterValue,
  FooterChips,
  HeadCell,
  TableSortModel,
} from "../components/Table/types";

interface User {
  address: Address;
  company: Company;
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
  status: Status;
  created: string;
  active: boolean;
}

interface Address {
  city: string;
  geo: Geo;
  street: string;
  suite: string;
  zipcode: string;
}

interface Geo {
  lat: string;
  lng: string;
}

interface Company {
  bs: string;
  catchPhrase: string;
  name: string;
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Main/Table",
  component: EnhancedTable<User>,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies Meta<typeof EnhancedTable<User>>;

export default meta;
type Story = StoryObj<typeof meta>;

type Status = "good" | "warning" | "error";

const data: User[] = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496",
      },
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
    status: "good",
    created: "2023-08-04T00:25:58.405Z",
    active: true,
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
    address: {
      street: "Victor Plains",
      suite: "Suite 879",
      city: "Wisokyburgh",
      zipcode: "90566-7771",
      geo: {
        lat: "-43.9509",
        lng: "-34.4618",
      },
    },
    phone: "010-692-6593 x09125",
    website: "anastasia.net",
    company: {
      name: "Deckow-Crist",
      catchPhrase: "Proactive didactic contingency",
      bs: "synergize scalable supply-chains",
    },
    status: "good",
    created: "2023-07-04T00:10:58.405Z",
    active: true,
  },
  {
    id: 3,
    name: "Clementine Bauch",
    username: "Samantha",
    email: "Nathan@yesenia.net",
    address: {
      street: "Douglas Extension",
      suite: "Suite 847",
      city: "McKenziehaven",
      zipcode: "59590-4157",
      geo: {
        lat: "-68.6102",
        lng: "-47.0653",
      },
    },
    phone: "1-463-123-4447",
    website: "ramiro.info",
    company: {
      name: "Romaguera-Jacobson",
      catchPhrase: "Face to face bifurcated interface",
      bs: "e-enable strategic applications",
    },
    status: "good",
    created: "2023-07-04T00:25:58.405Z",
    active: true,
  },
  {
    id: 4,
    name: "Patricia Lebsack",
    username: "Karianne",
    email: "Julianne.OConner@kory.org",
    address: {
      street: "Hoeger Mall",
      suite: "Apt. 692",
      city: "South Elvis",
      zipcode: "53919-4257",
      geo: {
        lat: "29.4572",
        lng: "-164.2990",
      },
    },
    phone: "493-170-9623 x156",
    website: "kale.biz",
    company: {
      name: "Robel-Corkery",
      catchPhrase: "Multi-tiered zero tolerance productivity",
      bs: "transition cutting-edge web services",
    },
    status: "warning",
    created: "2023-06-04T00:25:58.405Z",
    active: true,
  },
  {
    id: 5,
    name: "Chelsey Dietrich",
    username: "Kamren",
    email: "Lucio_Hettinger@annie.ca",
    address: {
      street: "Skiles Walks",
      suite: "Suite 351",
      city: "Roscoeview",
      zipcode: "33263",
      geo: {
        lat: "-31.8129",
        lng: "62.5342",
      },
    },
    phone: "(254)954-1289",
    website: "demarco.info",
    company: {
      name: "Keebler LLC",
      catchPhrase: "User-centric fault-tolerant solution",
      bs: "revolutionize end-to-end systems",
    },
    status: "warning",
    created: "2023-05-04T00:25:58.405Z",
    active: true,
  },
  {
    id: 6,
    name: "Mrs. Dennis Schulist",
    username: "Leopoldo_Corkery",
    email: "Karley_Dach@jasper.info",
    address: {
      street: "Norberto Crossing",
      suite: "Apt. 950",
      city: "South Christy",
      zipcode: "23505-1337",
      geo: {
        lat: "-71.4197",
        lng: "71.7478",
      },
    },
    phone: "1-477-935-8478 x6430",
    website: "ola.org",
    company: {
      name: "Considine-Lockman",
      catchPhrase: "Synchronised bottom-line interface",
      bs: "e-enable innovative applications",
    },
    status: "warning",
    created: "2023-08-04T00:25:58.405Z",
    active: false,
  },
  {
    id: 7,
    name: "Kurtis Weissnat",
    username: "Elwyn.Skiles",
    email: "Telly.Hoeger@billy.biz",
    address: {
      street: "Rex Trail",
      suite: "Suite 280",
      city: "Howemouth",
      zipcode: "58804-1099",
      geo: {
        lat: "24.8918",
        lng: "21.8984",
      },
    },
    phone: "210.067.6132",
    website: "elvis.io",
    company: {
      name: "Johns Group",
      catchPhrase: "Configurable multimedia task-force",
      bs: "generate enterprise e-tailers",
    },
    status: "error",
    created: "2023-04-04T00:25:58.405Z",
    active: false,
  },
  {
    id: 8,
    name: "Nicholas Runolfsdottir V",
    username: "Maxime_Nienow",
    email: "Sherwood@rosamond.me",
    address: {
      street: "Ellsworth Summit",
      suite: "Suite 729",
      city: "Aliyaview",
      zipcode: "45169",
      geo: {
        lat: "-14.3990",
        lng: "-120.7677",
      },
    },
    phone: "586.493.6943 x140",
    website: "jacynthe.com",
    company: {
      name: "Abernathy Group",
      catchPhrase: "Implemented secondary concept",
      bs: "e-enable extensible e-tailers",
    },
    status: "error",
    created: "2023-02-04T00:25:58.405Z",
    active: false,
  },
  {
    id: 9,
    name: "Glenna Reichert",
    username: "Delphine",
    email: "Chaim_McDermott@dana.io",
    address: {
      street: "Dayna Park",
      suite: "Suite 449",
      city: "Bartholomebury",
      zipcode: "76495-3109",
      geo: {
        lat: "24.6463",
        lng: "-168.8889",
      },
    },
    phone: "(775)976-6794 x41206",
    website: "conrad.com",
    company: {
      name: "Yost and Sons",
      catchPhrase: "Switchable contextually-based project",
      bs: "aggregate real-time technologies",
    },
    status: "error",
    created: "2023-01-04T00:25:58.405Z",
    active: false,
  },
  {
    id: 10,
    name: "Clementina DuBuque",
    username: "Moriah.Stanton",
    email: "Rey.Padberg@karina.biz",
    address: {
      street: "Kattie Turnpike",
      suite: "Suite 198",
      city: "Lebsackbury",
      zipcode: "31428-2261",
      geo: {
        lat: "-38.2386",
        lng: "57.2232",
      },
    },
    phone: "024-648-3804",
    website: "ambrose.net",
    company: {
      name: "Hoeger LLC",
      catchPhrase: "Centralized empowering task-force",
      bs: "target end-to-end models",
    },
    status: "error",
    created: "2023-01-01T00:25:58.405Z",
    active: true,
  },
];

// type RowColor = Record<NestedKeyOf<User>, string>;

type RowColor = Record<Status, string>;

const getBackgroundColor = (color: string, mode: string) =>
  mode === "dark" ? darken(color, 0.8) : lighten(color, 0.6);

const rowColor: RowColor = {
  good: getBackgroundColor("#66bb6a", "light"),
  error: getBackgroundColor("#f44336", "light"),
  warning: getBackgroundColor("#ffa726", "light"),
};

const colorField = ["status", "estadoCedulaIdentidad"];

const headCells: HeadCell<User>[] = [
  { id: "id", type: "string", label: "Id" },
  { id: "name", type: "string", label: "Nombre" },
  { id: "created", type: "date", label: "Creado" },
  { id: "username", type: "string", label: "Usuario" },
  { id: "address.city", type: "string", label: "Ciudad" },
  { id: "address.geo.lat", type: "number", label: "Lat" },
  { id: "address.geo.lng", type: "number", label: "Lng" },
  { id: "active", type: "boolean", label: "Activo", align: "center" },
];

const footerChips: FooterChips = (
  sm: boolean,
  setFilterValue?: (
    filter: FilterValue | ((prevVar: FilterValue) => FilterValue)
  ) => void,
  setFilterCount?: (value: number | ((prevVar: number) => number)) => void
): ChipProps[] => {
  const updateValue = (estado: Status) => {
    if (setFilterValue)
      setFilterValue({
        columnField: "estado",
        operatorValue: "=",
        value: estado,
      });
    if (setFilterCount) setFilterCount(1);
  };

  const clear = () => {
    if (setFilterValue)
      setFilterValue({
        columnField: "nombre",
        operatorValue: "%",
        value: "",
      });
    if (setFilterCount) setFilterCount(0);
  };

  return [
    {
      color: "primary",
      variant: "outlined",
      label: sm ? "All" : null,
      onClick: () => clear(),
      onDelete: () => clear(),
    },
    {
      color: "success",
      variant: "outlined",
      label: sm ? "Good" : null,
      onClick: () => updateValue("good"),
      onDelete: () => updateValue("good"),
    },
    {
      color: "warning",
      variant: "outlined",
      label: sm ? "Warning" : null,
      onClick: () => updateValue("warning"),
      onDelete: () => updateValue("warning"),
    },
    {
      color: "error",
      variant: "outlined",
      label: sm ? "Error" : null,
      onClick: () => updateValue("error"),
      onDelete: () => updateValue("error"),
    },
  ];
};

const sortModel: TableSortModel<User> = {
  field: "created",
  sort: "desc",
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    // setReload: setReaload,
    loading: false,
    rows: data,
    rowCount: data.length,
    page: 0,
    pageSize: 20,
    // onPageChange: onPageChange,
    // onRowsPerPageChange: onRowsPerPageChange,
    sortModel,
    // onRequestSort: onRequestSort,
    rowColor,
    colorField,
    headCells,
    title: "Reporte",
    footerChips,
    // Actions: Actions,
  },
};
