import { getProducts } from '@/app/_actions/products';
import { ProductsAdminClient } from '@/components/admin/ProductsAdminClient';

export default async function ProductsManagementPage() {
  const products = await getProducts();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <ProductsAdminClient initialProducts={products as any[]} />;
}

