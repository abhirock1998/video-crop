import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  disabled?: boolean;
  label?: string;
  onClick?: () => void;
  showLabelWithIcon?: boolean;
}>;

const Button = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className="border border-white text-white text-[1rem] px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {props.showLabelWithIcon ? (
        <div className="flex items-center justify-center">
          {props.children}
          <span className="ml-2">{props.label}</span>
        </div>
      ) : (
        props.children || props.label
      )}
    </button>
  );
};

export default Button;
