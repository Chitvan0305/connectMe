import React from 'react'
import { Button } from 'antd';

interface ButtonProps {
    className?: string;
    type?: string;
    onClick?: () => void
    title: string
}

const PrimaryButton: React.FC<ButtonProps> = ({className, type, onClick, title}) => {
  return (
   <Button className={className} htmlType={type} onClick={onClick}>
    {title}
   </Button>
  )
}

export default PrimaryButton