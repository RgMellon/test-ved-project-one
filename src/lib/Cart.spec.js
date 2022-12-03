import Cart from './Cart';

describe('Cart', () => {
  let cart;

  let product = {
    title: 'Adidas running shoes - men',
    price: 35388,
  };

  let product2 = {
    title: 'Adidas running shoes - women',
    price: 41872,
  };

  beforeEach(() => {
    cart = new Cart();
  });

  describe('getTotal()', () => {
    it('should return 0 when getTotal() is executed in a newly created instance', () => {
      expect(cart.getTotal().getAmount()).toEqual(0);
    });

    it('should multiply quantity and price and receive the total amount', () => {
      const item = {
        product,
        quantity: 2,
      };

      cart.add(item);
      expect(cart.getTotal().getAmount()).toEqual(70776);
    });

    it('should ensure no more than one product exists at a time', () => {
      cart.add({ product, quantity: 2 });
      cart.add({ product, quantity: 1 });

      expect(cart.getTotal().getAmount()).toEqual(35388);
    });

    it('should update total when a product gets included and then removed', () => {
      cart.add({ product, quantity: 2 });
      cart.add({ product: product2, quantity: 1 });

      cart.remove(product);

      expect(cart.getTotal().getAmount()).toEqual(41872);
    });
  });

  describe('checkout()', () => {
    it('should return an object with the total and the list of items', () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product: product2,
        quantity: 3,
      });

      expect(cart.checkout()).toMatchSnapshot();
    });

    it('should return an object with the total and the list of items when summary() is called', () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product: product2,
        quantity: 3,
      });

      expect(cart.summary()).toMatchSnapshot();
      expect(cart.getTotal().getAmount()).toBeGreaterThan(0);
    });

    it('should reset the cart when checkout() is called', () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.checkout();

      expect(cart.getTotal().getAmount()).toEqual(0);
    });

    it('should include formatted amount in the summary', () => {
      cart.add({
        product,
        quantity: 5,
      });

      cart.add({
        product: product2,
        quantity: 3,
      });

      expect(cart.summary().formatted).toEqual('R$3,025.56');
    });
  });

  describe('special conditions', () => {
    it('should apply percentage discount quantity above minimum is passed', () => {
      const conditional = {
        percentage: 30,
        minimum: 2,
      };

      cart.add({
        product,
        conditional,
        quantity: 3,
      });

      expect(cart.getTotal().getAmount()).toEqual(74315);
    });

    it('should NOT apply percentage discount quantity is bellow or equal minimum', () => {
      const conditional = {
        percentage: 30,
        minimum: 2,
      };

      cart.add({
        product,
        conditional,
        quantity: 2,
      });

      expect(cart.getTotal().getAmount()).toEqual(70776);
    });

    it('should apply quantity discount for even quantities', () => {
      const conditional = {
        quantity: 2,
      };

      cart.add({
        product,
        conditional,
        quantity: 4,
      });

      expect(cart.getTotal().getAmount()).toEqual(70776);
    });

    it('should apply quantity discount for odd quantities', () => {
      const conditional = {
        quantity: 2,
      };

      cart.add({
        product,
        conditional,
        quantity: 5,
      });

      expect(cart.getTotal().getAmount()).toEqual(106164);
    });

    it('should NOT apply quantity discount for even quantities when condtions is not match', () => {
      const conditional = {
        quantity: 2,
      };

      cart.add({
        product,
        conditional,
        quantity: 1,
      });

      expect(cart.getTotal().getAmount()).toEqual(35388);
    });

    it('should receive two or more condtitions and determine/apply the best one', () => {
      const conditional1 = {
        percentage: 30,
        minimum: 2,
      };

      const conditional2 = {
        quantity: 2,
      };

      cart.add({
        product,
        conditional: [conditional1, conditional2],
        quantity: 5,
      });

      expect(cart.getTotal().getAmount()).toEqual(106164);
    });

    it('should receive two or more condtitions and determine/apply the second', () => {
      const conditional1 = {
        percentage: 80,
        minimum: 2,
      };

      const conditional2 = {
        quantity: 2,
      };

      cart.add({
        product,
        conditional: [conditional1, conditional2],
        quantity: 5,
      });

      expect(cart.getTotal().getAmount()).toEqual(35388);
    });
  });
});
