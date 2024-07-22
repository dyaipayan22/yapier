import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from './ui/card';

interface ICardWrapperProps {
  title: string;
  description?: string;
  footer?: string;
  children: React.ReactNode;
}

const AuthFormWrapper = ({
  title,
  description,
  footer,
  children,
}: ICardWrapperProps) => {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <span>{footer}</span>
      </CardFooter>
    </Card>
  );
};

export default AuthFormWrapper;
