import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from './ui/card';
import { Link } from 'react-router-dom';

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
        <span className="text-sm mr-1">{footer}</span>
        {linkText && linkUrl && (
          <Link to={linkUrl} className="text-sm">
            {linkText}
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default AuthFormWrapper;
