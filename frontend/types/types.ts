export type AuthProps = {
labelText :string,
placeholderText : string,
icon: string,
type: string,
value:string,
onchange: (e: React.ChangeEvent<HTMLInputElement>) => void,
onclick?:React.MouseEventHandler<HTMLImageElement>
}


export type ButtonProp = {
    text:string,
    onclick:React.MouseEventHandler<HTMLButtonElement>,
    // backgroundcolor?:string,
    // color? :string,
    // bordercolor?:string,
    classname?:string,
    disabled?:boolean

}

export type NavIconProps = {
    src :string
}

export type HomeInputs = {
    label : string ,
    placeholderText:string,
     httpText?: string,
     onchange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value:string,
}
export type HeaderTextProps = {
    text: string,
    icon?: string,
}

export interface PaginationProps {
  dataLength: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}
export type  TableProps = {
    onClick: (link: string) => void;
    triggerFetch:boolean
}

export interface TableResponseData {
    name: string;
    description: string;
    shortened_url: string;
  }[]