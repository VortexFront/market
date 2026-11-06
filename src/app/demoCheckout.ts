export interface DemoCustomer {
  reference: string;
  name: string;
  email: string;
  address: string;
}

// All values are generated locally. This is a preview, never an order record.
export function createDemoCustomer(reference: string): DemoCustomer {
  const suffix = reference.replace(/[^a-z0-9]/gi, '').slice(0, 8).toLowerCase() || 'preview';
  return {
    reference: `DEMO-${suffix}`,
    name: `Тестовый покупатель ${suffix}`,
    email: `demo-${suffix}@example.invalid`,
    address: 'Демо-город, Учебная улица, 1 — вымышленный адрес',
  };
}
