import { Plus } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import AddLinkModal from '../../shared/modals/add-new-link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from './link';
import useCurrentUser from '@/hooks/useCurrentUser';
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import useLinks from '@/hooks/useLinks';
import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { signalIframe } from '@/utils/helpers';
import toast from 'react-hot-toast';
import LinkSkeleton from './link-skeleton';

const LinksEditor = () => {
  const { data: currentUser } = useCurrentUser();
  const userId = currentUser?.id ? currentUser.id : null;

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  const { data: userLinks, isLoading } = useLinks(userId);
  const queryClient = useQueryClient();

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const activeIndex = userLinks.findIndex((link) => link.id === active.id);
      const overIndex = userLinks.findIndex((link) => link.id === over.id);
      const newLinks = arrayMove(userLinks, activeIndex, overIndex);

      queryClient.setQueryData(['links', currentUser?.id], () => newLinks);
      await toast.promise(updateLinksOrderMutation.mutateAsync(newLinks), {
        loading: 'Syncing changes',
        success: 'Changes synced',
        error: 'An error occured',
      });
    }
  };

  const updateLinksOrderMutation = useMutation(
    async (newLinks) => {
      await axios.put(`/api/links`, {
        links: newLinks,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['links', currentUser?.id]);
        signalIframe();
      },
    }
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <div className="mx-auto my-6 max-w-[760px]">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h3 className="font-display text-4xl leading-none text-ink">Links</h3>
            <p className="mt-2 text-sm text-ink/60">
              Arrange your destinations, tweak their details and keep the page
              feeling intentional.
            </p>
          </div>
        </div>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <div>
              <button className="action-primary flex w-full items-center justify-center gap-2">
                <Plus size={18} /> Add link
              </button>
            </div>
          </Dialog.Trigger>
          <AddLinkModal />
        </Dialog.Root>

        <div className="my-8">
          {!isLoading
            ? userLinks?.map(({ id, ...userLink }) => (
                <React.Fragment key={id}>
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <SortableContext
                      items={userLinks && userLinks}
                      strategy={verticalListSortingStrategy}
                    >
                      <Link key={id} id={id} {...userLink} />
                    </SortableContext>
                  </motion.div>
                </React.Fragment>
              ))
            : Array.from({ length: 4 }).map((_, i) => <LinkSkeleton key={i} />)}
          {!isLoading && userLinks?.length === 0 && (
            <div className="surface-card mx-auto mt-4 flex h-auto w-full max-w-md flex-col rounded-[2rem] p-6 text-center">
              <Image
                className="mx-auto object-cover"
                width="180"
                height="180"
                alt="not-found"
                src="/assets/not-found.png"
              />
              <h3 className="mt-4 font-display text-3xl leading-none text-[#222]">
                You don&apos;t have any links yet
              </h3>
              <p className="mt-3 px-3 text-sm text-[#555]">
                Start with your strongest destination and build the rest around
                it.
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="h-[40px] mb-12" />
    </DndContext>
  );
};

export default LinksEditor;
