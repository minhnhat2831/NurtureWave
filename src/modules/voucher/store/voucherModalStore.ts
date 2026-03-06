import { create } from 'zustand';
import type { Voucher } from '../schema/VoucherSchema.type';

interface VoucherModalState {
  showFormModal: boolean;
  selectedVoucher: Voucher | null;
  openFormModal: (voucher?: Voucher) => void;
  closeFormModal: () => void;
}

export const useVoucherModalStore = create<VoucherModalState>((set) => ({
  showFormModal: false,
  selectedVoucher: null,
  openFormModal: (voucher) =>
    set({ showFormModal: true, selectedVoucher: voucher || null }),
  closeFormModal: () =>
    set({ showFormModal: false, selectedVoucher: null }),
}));
