interface Props {
  edit: boolean;
  type: "text" | "date";
  children: any;
  classname: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function FlexibleInput({
  edit,
  type,
  children,
  classname,
  value,
  name,
  onChange,
}: Props) {
  return edit ? (
    <input
      type={type}
      value={value}
      onChange={onChange}
      name={name}
      className="outline-1 p-1 rounded-md my-1"
    />
  ) : (
    <p className={`${classname}`}>{children}</p>
  );
}

export default FlexibleInput;
