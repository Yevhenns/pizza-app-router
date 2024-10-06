export const orderTemplate = `
<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Order</title>
</head>
<body>
<h3>Інформація про замовника</h3>
<p>Ім'я: {{name}}</p>
<p>Номер телефону: {{number}}</p>
{{#if address}}
<p>Адреса: {{address}}</p>
{{/if}}
{{#if comment}}
<p>Коментар: {{comment}}</p>
{{/if}}
<p>Загальна сума: {{orderSum}} грн.</p>
<h3>Замовлення</h3>
<ol>
    {{#each order}}
        <li>{{this.title}} - {{this.quantity}} шт.</li>       
        <p>{{this.optionsTitles}}</p>
    {{/each}}
</ol>
</body>
</html>`;
