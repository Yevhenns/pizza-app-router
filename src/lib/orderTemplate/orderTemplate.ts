export const orderTemplate = `
<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Order</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 10px;
            background-color: #f9f9f9;
        }
        h3 {
            color: #333;
            border-bottom: 2px solid #ddd;
            padding-bottom: 5px;
        }
        p {
            margin: 5px 0;
        }
        ol {
            padding-left: 20px;
        }
        li {
            font-weight: bold;
        }
        .order-sum {
            font-size: 18px;
            font-weight: bold;
            color: #d9534f;
        }
    </style>
</head>
<body>
<h3>Інформація про замовника</h3>
<p><strong>Ім'я:</strong> {{name}}</p>
<p><strong>Номер телефону:</strong> {{number}}</p>
{{#if address}}
<p><strong>Адреса:</strong> {{address}}</p>
{{/if}}
{{#if comment}}
<p><strong>Коментар:</strong> {{comment}}</p>
{{/if}}
<p class="order-sum">Загальна сума: {{orderSum}} грн.</p>
<h3>Замовлення</h3>
<ol>
    {{#each order}}
        <li>{{this.title}} - {{this.quantity}} шт.</li>       
        <p><em>{{this.optionsTitles}}</em></p>
    {{/each}}
</ol>
</body>
</html>`;
