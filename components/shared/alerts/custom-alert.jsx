import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

const CustomAlert = ({ title, action, desc, confirmMsg, close }) => (
  <AlertDialog.Portal>
    <AlertDialog.Overlay className="dialog-overlay" />
    <AlertDialog.Content className="dialog-content contentShow max-h-[85vh] max-w-[500px]">
      <AlertDialog.Title className="m-0 font-display text-3xl leading-none text-slate-900">
        {title}
      </AlertDialog.Title>
      <AlertDialog.Description className="mb-6 mt-4 text-[15px] leading-relaxed text-slate-700">
        {desc}
      </AlertDialog.Description>
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <AlertDialog.Cancel asChild>
          <button
            onClick={close}
            className="action-secondary"
          >
            Cancel
          </button>
        </AlertDialog.Cancel>
        <AlertDialog.Action asChild>
          <button
            onClick={action}
            className="action-primary"
          >
            {confirmMsg}
          </button>
        </AlertDialog.Action>
      </div>
    </AlertDialog.Content>
  </AlertDialog.Portal>
);

export default CustomAlert;
