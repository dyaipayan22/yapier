import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from './ui/card';

interface ICardWrapperProps {
  title: string;
  footer?: string;
  linkUrl?: string;
  linkText?: string;
  children: React.ReactNode;
}

const AuthFormWrapper = ({
  title,
  footer,
  linkUrl,
  linkText,
  children,
}: ICardWrapperProps) => {
  return (
    <Card className="bg-inherit">
      <CardHeader>
        <CardTitle className="font-heading text-2xl font-medium text-center">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <span className="text-sm">{footer}</span>
        <a href={linkUrl} className="text-sm">
          {linkText}
        </a>
      </CardFooter>
    </Card>
  );
};

export default AuthFormWrapper;
