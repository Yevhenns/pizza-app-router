import fs from 'fs';
import Handlebars from 'handlebars';
import path from 'path';

const templatePath = path.join(
  process.cwd(),
  'src/lib/orderTemplate/orderTemplate.handlebars'
);
const templateSource = fs.readFileSync(templatePath, 'utf-8');

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
  const template = Handlebars.compile(templateSource);
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
