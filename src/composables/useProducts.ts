import { ref, computed } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { type Product, type Category } from "../types/product";

export function useProducts() {
  const generateId = () => `id_${Math.random().toString(36).substring(2, 15)}`;
  const products = useLocalStorage<Product[]>("products", [
    {
      id: generateId(),
      name: "Jabłko",
      category: "fruits",
      unit: "pcs",
      description: "Świeże jabłka",
      stock: 100,
      added: new Date().toLocaleDateString(),
    },
    {
      id: generateId(),
      name: "Marchewka",
      category: "vegetables",
      unit: "pcs",
      description: "Soczyste marchewki",
      stock: 50,
      added: new Date().toLocaleDateString(),
    },
    {
      id: generateId(),
      name: "Mleko",
      category: "dairy",
      unit: "l",
      description: "Mleko prosto od krowy",
      stock: 30,
      added: new Date().toLocaleDateString(),
    },
    {
      id: generateId(),
      name: "Kurczak",
      category: "meat",
      unit: "kg",
      description: "Świeży kurczak",
      stock: 20,
      added: new Date().toLocaleDateString(),
    },
  ]);

  const filterCategory = ref<Category["value"]>("all");
  const filteredProducts = computed(() =>
    products.value.filter(
      (product) =>
        filterCategory.value === "all" ||
        product.category === filterCategory.value
    )
  );

  function changeStock(product: Product, delta: number) {
    const newStock = product.stock + delta;
    if (newStock >= 0) {
      product.stock = newStock;
    }
  }

  function removeProduct(product: Product) {
    const index = products.value.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      products.value.splice(index, 1);
    }
  }

  function saveProduct(product: Product) {
    const idx = products.value.findIndex((p) => p.id === product.id);
    if (idx !== -1) {
      products.value[idx] = { ...product };
    } else {
      products.value.push({ ...product });
    }
  }

  function addNewProduct(): Product {
    return {
      id: generateId(),
      name: "",
      category: "fruits",
      unit: "pcs",
      description: "",
      stock: 0,
      added: new Date().toLocaleDateString(),
    };
  }

  return {
    products,
    filterCategory,
    filteredProducts,
    generateId,
    changeStock,
    removeProduct,
    saveProduct,
    addNewProduct,
  };
}
