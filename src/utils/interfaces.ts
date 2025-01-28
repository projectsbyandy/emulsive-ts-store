export interface IUiComponentProps {
  name: string,
  label?: string,
  defaultValue?: string
}

export interface IUiComponentProps {
  name: string,
  label?: string,
  defaultValue?: string
}

export interface IFormInputProps extends IUiComponentProps{
  type: string
}

export interface ISelectInputProps extends IUiComponentProps{
  options: string[];
}