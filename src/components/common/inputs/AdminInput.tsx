import { FunctionComponent, InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<any> {
  label?: string
  setValue?: (value: string) => void
}

export const AdminInput: FunctionComponent<Props> = ({ label, setValue, ...inputHTMLAttributes }) => {
  return (
    <div className='admin-input'>
      {label ? <div className='label'>{label}</div> : null}
      <input
        {...inputHTMLAttributes}
        onChange={(event) => {
          event.preventDefault()
          setValue(event.target.value)
        }}
      />

      <style jsx>{
        /* language=CSS */ `
          .admin-input {
            margin: 4px;
            flex: 1 0 auto;
          }

          .label {
            font-size: 12px;
            background-color: hsla(0, 0%, 0%, 0.3);
            width: max-content;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            padding: 2px 8px;
            margin: 0 0 0 8px;
            color: white;
          }

          input {
            width: 100%;
            color: black;
            background: hsla(0, 0%, 100%, 0.75);
            border-radius: 4px;
            min-height: 42px;
            padding: 4px 10px;
            border: 1px solid hsl(0, 0%, 90%);
          }

          input:hover {
            border: 1px solid hsl(0, 0%, 60%);
          }

          input:focus {
            background: white;
            border: 1px solid hsl(0, 0%, 60%);
          }
        `
      }</style>
    </div>
  )
}
