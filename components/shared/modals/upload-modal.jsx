/* eslint-disable @next/next/no-img-element */
import * as Dialog from '@radix-ui/react-dialog';
import { useState, useCallback } from 'react';
import Image from 'next/image';
import closeSVG from '@/public/close_button.svg';
import { Upload } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { useQueryClient } from '@tanstack/react-query';
import useCurrentUser from '@/hooks/useCurrentUser';
import toast from 'react-hot-toast';

const UploadModal = ({ onChange, value, submit }) => {
  const [base64, setBase64] = useState(value);
  const { data: currentUser } = useCurrentUser();
  const [disableUpload, setDisableUpload] = useState(true);

  const handleChange = useCallback(
    (base64) => {
      onChange(base64);
      setDisableUpload(false);
    },
    [onChange]
  );

  const queryClient = useQueryClient();

  const handleDrop = useCallback(
    (files) => {
      const file = files[0];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (file.size > maxSize) {
        alert('Max file size exceeded. Please upload a file under 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setBase64(event.target.result);
        handleChange(event.target.result);
      };
      reader.readAsDataURL(file);
      queryClient.invalidateQueries(['users', currentUser?.handle]);
    },
    [currentUser?.handle, handleChange, queryClient]
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
  });

  const handleUploadPfp = () => {
    if (!disableUpload) {
      submit();
      setBase64('');
      setDisableUpload(true);
    } else {
      toast.error('No file selected: Pick an image first');
      return;
    }
  };

  return (
    <>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content
          className="dialog-content contentShow z-40 w-[350px] sm:w-[500px] md:max-w-lg lg:max-w-3xl max-md:max-w-lg focus:outline-none"
        >
          <div className="mb-5 flex flex-row items-center justify-between">
            <Dialog.Title className="font-display text-3xl leading-none text-slate-900">
              Upload Image
            </Dialog.Title>
            <Dialog.Close className="flex flex-end justify-end">
              <div className="surface-card flex items-center justify-center rounded-full p-2">
                <Image priority src={closeSVG} alt="close" />
              </div>
            </Dialog.Close>
          </div>
          <div
            {...getRootProps({
              className:
                'surface-card my-4 flex h-[220px] w-full justify-center rounded-[1.6rem] border border-dashed p-10',
            })}
          >
            <input
              className="w-full h-[200px] "
              type="file"
              {...getInputProps()}
            />
            {base64 ? (
              <div className="flex flex-col">
                <div className="">
                  <img
                    alt="uploaded-image"
                    loading="lazy"
                    className="h-[110px] w-[110px] overflow-hidden rounded-[1.8rem] border object-cover"
                    style={{
                      borderColor: 'rgba(23, 20, 17, 0.08)',
                    }}
                    src={base64}
                  />
                </div>
                <a
                  href="#"
                  className="mt-4 text-center text-sm text-ink/70 hover:underline"
                >
                  Change photo
                </a>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <h3 className="mb-2 text-center text-md font-semibold text-slate-800 sm:text-lg">
                    Choose files or drag and drop
                  </h3>
                  <h3 className="text-center text-slate-800">
                    (Max file size 5MB)
                  </h3>
                </div>
                <div className="my-10 absolute top-1/2 transform -translate-y-1/2 lg:my-6">
                  <Upload size={40} className="text-gray-400" />
                </div>
              </>
            )}
          </div>
          <Dialog.Close asChild>
            <button
              onClick={handleUploadPfp}
              className="action-primary mt-2 inline-flex w-full justify-center"
            >
              Upload image{' '}
              <span role="img" aria-label="rocket">
                🚀
              </span>
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </>
  );
};

export default UploadModal;
