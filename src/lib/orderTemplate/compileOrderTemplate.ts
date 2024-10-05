import Handlebars from 'handlebars';

import { orderTemplate } from './orderTemplate';

interface compileOrderTemplateProps {
  name: string;
  number: string;
  comment?: string;
  address?: string;
  orderSum: number;
  order: Ordered[];
  userId?: string;
}

export function compileOrderTemplate({
  name,
  number,
  address,
  comment,
  orderSum,
  order,
}: compileOrderTemplateProps) {
  const template = Handlebars.compile(orderTemplate);
  const htmlBody = template({
    name,
    number,
    address,
    comment,
    orderSum,
    order,
  });
  return htmlBody;
}
