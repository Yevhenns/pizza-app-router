import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';

export default function addSupplement() {
  return (
    <form>
      <h3>Додати опцію</h3>
      <Input label="Назва" />
      <Input label="Ціна" />
      <Button>Підтвердити</Button>
    </form>
  );
}
