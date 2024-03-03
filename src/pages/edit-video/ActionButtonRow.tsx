import React from "react";
import { ActionButton } from "../../components";
import { FaScissors, FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";

type Props = {
  onEdit: () => void;
  onCancel: () => void;
  onDone: () => void;
  isEditing: boolean;
  disabledDone: boolean;
  isDone: boolean;
  onDownload: () => void;
  onPreview: () => void;
};

const ActionButtonRow = (props: Props) => {
  return props.isDone ? (
    <div className={`flex gap-x-3 items-center justify-center`}>
      <ActionButton showLabelWithIcon label="Preview" onClick={props.onPreview}>
        <IoMdDownload />
      </ActionButton>
      <ActionButton
        showLabelWithIcon
        label="Download"
        onClick={props.onDownload}
      >
        <IoMdDownload />
      </ActionButton>
    </div>
  ) : (
    <div className={`flex gap-x-3 items-center justify-center`}>
      {props.isEditing ? (
        <React.Fragment>
          <ActionButton
            showLabelWithIcon
            label="Done"
            disabled={props.disabledDone}
            onClick={props.onDone}
          >
            <FaCheck />
          </ActionButton>
          <ActionButton
            showLabelWithIcon
            label="Cancel"
            onClick={props.onCancel}
          >
            <IoClose />
          </ActionButton>
        </React.Fragment>
      ) : (
        <ActionButton
          showLabelWithIcon
          label="Crop Video"
          onClick={props.onEdit}
        >
          <FaScissors />
        </ActionButton>
      )}
    </div>
  );
};

export default ActionButtonRow;
