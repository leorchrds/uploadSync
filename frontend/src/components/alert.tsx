import React from 'react'

interface AlertProps {
  children: React.ReactNode
  type?: 'info' | 'success' | 'warning' | 'error'
  className?: string
}

export const Alert: React.FC<AlertProps> = ({
  children,
  type = 'info',
  className = '',
}) => {
  const types = {
    info: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
  }

  return (
    <div className={`p-4 rounded-md ${types[type]} ${className}`} role="alert">
      {children}
    </div>
  )
}