import * as Dialog from '@radix-ui/react-dialog';
import { Edit } from 'lucide-react';
import EditLinkModal from '../modals/edit-link';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Drawer } from 'vaul';
import { ArchiveIcon } from 'lucide-react';
import CustomAlert from '../alerts/custom-alert';
import { Trash } from 'lucide-react';

const PopoverMobile = ({
  id,
  title,
  url,
  isArchived,
  archiveProps,
  deleteAlertProps,
  closeDrawer,
}) => {
  return (
    <>
      <Drawer.Portal>
        <Drawer.Overlay className="dialog-overlay" />
        <Drawer.Content className="slideBottom fixed bottom-0 left-0 right-0 mt-24 rounded-t-[2rem] bg-[#fbf6ee] p-3 shadow-float">
          <div className="mx-auto mb-4 mt-4 h-1.5 w-12 flex-shrink-0 rounded-full bg-zinc-300" />
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="surface-card mb-2 flex w-full items-center gap-4 rounded-[1.4rem] p-4 text-sm font-medium text-ink/70">
                <Edit size={20} />
                <h3 className="text-lg">Edit</h3>
              </button>
            </Dialog.Trigger>
            <EditLinkModal
              close={closeDrawer}
              id={id}
              title={title}
              url={url}
            />
          </Dialog.Root>
          <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
              <button className="surface-card mb-2 flex w-full items-center gap-4 rounded-[1.4rem] p-4 text-sm font-medium text-ink/70">
                <ArchiveIcon size={20} />
                <h3 className="text-lg">
                  {!isArchived ? 'Archive' : 'Unarchive'}
                </h3>
              </button>
            </AlertDialog.Trigger>
            <CustomAlert close={closeDrawer} {...archiveProps} />
          </AlertDialog.Root>
          <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
              <button className="surface-card flex w-full items-center gap-4 rounded-[1.4rem] p-4 text-sm font-medium text-red-500">
                <Trash size={20} />
                <h3 className="text-lg">Delete</h3>
              </button>
            </AlertDialog.Trigger>
            <CustomAlert close={closeDrawer} {...deleteAlertProps} />
          </AlertDialog.Root>
        </Drawer.Content>
      </Drawer.Portal>
    </>
  );
};

export default PopoverMobile;
