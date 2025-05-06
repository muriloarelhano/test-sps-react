import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core';
import { ArrowLeft } from 'lucide-react';

const GoBackButton = ({ style }) => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  return (
    <Button
      leftSection={<ArrowLeft size={16} />}
      variant="outline"
      onClick={goToHome}
      style={{ ...style }}
    >
      Voltar para Home
    </Button>
  );
};

export default GoBackButton;