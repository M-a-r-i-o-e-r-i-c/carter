import { useState, createContext, useEffect} from "react";
import { useQuery } from "react-query";
import { BrowserRouter } from "react-router-dom";
import Fuse from 'fuse.js'
//Components
import Item from "./Item/Item";
import Cart from "./Cart/Cart";
import Header from "./Header/Header";
//icons
import Drawer from "@mui/material/Drawer";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Badge from "@mui/material/Badge";
//styles

import { Wrapper, StyledButton } from "./App.styles";

export type CartItemType = {
  id: string;
  // catergory: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};



const CartContext = createContext<{
  cartItems: CartItemType[];
  setCartItems: (items: CartItemType[]) => void;
  getTotalItems: (items: CartItemType[]) => number;
  handleAddToCart: (clickedItem: CartItemType) => void;
  handleRemoveFromCart: (id: string) => void;
}>({
  cartItems: [],
  setCartItems: () => {},
  getTotalItems: () => 0,
  handleAddToCart: () => {},
  handleRemoveFromCart: () => {},
});

// const getProducts = async (): Promise<CartItemType[]> =>
//   await (await fetch("https://fakestoreapi.com/products")).json();

  const getProducts = async (): Promise<CartItemType[]> => {
    const response = await import("./product.json");
    return response.default;
  };

const App = () => {
  const [searchResults, setSearchResults] = useState([] as CartItemType[]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );
  //console.log(data);
  const fuse = new Fuse (data || [], {
  keys: ["title", "description"],
});


const handleSearch = (query: string) => {
  setSearchQuery(query);
  if (query === "") {
    setSearchResults([]);
  } else {
    const results = fuse.search(query);
    setSearchResults(results.map((result) => result.item));
  }
};


  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      //1. Is the item already added in the cart?
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      //First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong...</div>;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        getTotalItems,
        handleAddToCart,
        handleRemoveFromCart,
      }}
    >

        <Wrapper>
          <Header />
          <Drawer
            anchor="right"
            open={cartOpen}
            onClose={() => setCartOpen(false)}
          >
            <Cart
              cartItems={cartItems}
              addToCart={handleAddToCart}
              removeFromCart={handleRemoveFromCart}
            />
          </Drawer>
          <StyledButton onClick={() => setCartOpen(true)}>
            <Badge badgeContent={getTotalItems(cartItems)} color="error">
              <AddShoppingCartIcon />
            </Badge>
          </StyledButton>
          <input type="text" placeholder="search for a product" value={searchQuery}
  onChange={(event) => handleSearch(event.target.value)}/>
          <Grid container spacing={3}>
            {searchResults.length > 0
  ? searchResults.map((item) => (
      <Grid item key={item.id} xs={12} sm={4}>
        <Item item={item} handleAddToCart={handleAddToCart} />
      </Grid>
    )):
            data?.map((item) => (
              <Grid item key={item.id} xs={12} sm={4}>
                <Item item={item} handleAddToCart={handleAddToCart} />{" "}
              </Grid>
            ))}
          </Grid>
        </Wrapper>
    </CartContext.Provider>
  );
};

export default App;
