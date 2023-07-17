import React, { forwardRef } from 'react'
import { createEvent } from 'effector';

export const openModal = createEvent<React.RefObject<HTMLElement>>();
export const closeModal = createEvent<React.RefObject<HTMLElement>>();

const openModalUnboxed = openModal.filterMap(ref => {
    if (ref.current) return ref.current;
})
const closeModalUnboxed = closeModal.filterMap(ref => {
    if (ref.current) return ref.current;
})

openModalUnboxed.watch(modal => modal.classList.remove('hidden'));
closeModalUnboxed.watch(modal => modal.classList.add('hidden'));

type Props = {
    children: React.ReactNode,
}

const Modal = forwardRef(({ children }: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
    return (
        <div ref={ref} className='h-screen w-screen top-0 left-0 fixed z-20 bg-dark-main bg-opacity-50 hidden'>
            <div className='flex w-full h-full justify-center items-center'>
                {children}
            </div>
        </div>
    )
})

export default Modal;