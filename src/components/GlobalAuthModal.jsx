import React from 'react';
import { useAuthModal } from '../context/AuthModalContext';
import { AuthModal } from './Modal';

const GlobalAuthModal = () => {
  const { isAuthModalOpen, closeAuthModal } = useAuthModal();
  return <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />;
};

export default GlobalAuthModal;
