import BookItem from './book-item';

import classes from './book-shop.module.css';

function BookShop() {
	return (
		<section className={classes.bookShop}>
				<a href="https://www.google.com/aclk?sa=L&ai=DChcSEwj1q6bHh8PvAhWLhsAKHbDzBTsYABAGGgJpbQ&sig=AOD64_1lU5JAdeMr36QJU8dI2K-mR71c0g&ctype=5&q=&ved=0ahUKEwiZxqHHh8PvAhUOAp0JHSpuCv8Qww8IlgQ&adurl=">
					<BookItem 
						imageUrl="/images/site/books/new-poems-amazon.png"
						title="New Selected Poems by Stevie Smith"
						price="14.99"
						shopName="Amazon.com"
					/>
				</a>
				<a href="https://www.google.com/aclk?sa=l&ai=DChcSEwjS5o7XiMPvAhUMobMKHS4vBrcYABAWGgJxbg&sig=AOD64_3x0drcG7t9eSINeNwa3cSJQdBLBw&ctype=5&q=&ved=0ahUKEwihjInXiMPvAhUSGVkFHVlJCXwQww8IvAQ&adurl=">
					<BookItem 
						imageUrl="/images/site/books/collected-poems-thriftbooks.jpg"
						title="Stevie Smith: Collected Poems"
						price="12.99"
						shopName="ThriftBooks"
					/>
				</a>
				<a href="https://www.google.com/aclk?sa=l&ai=DChcSEwj1q6bHh8PvAhWLhsAKHbDzBTsYABAPGgJpbQ&sig=AOD64_325MwNKwqnBw9qwc8cHJ6lTwT9oA&ctype=5&q=&ved=0ahUKEwiZxqHHh8PvAhUOAp0JHSpuCv8Qww8ImAQ&adurl=">
				<BookItem 
					imageUrl="/images/site/books/collected-poems-used.jpg"
					title="Collected Poems of Stevie Smith (Used)"
					price="7.99"
					shopName="Chegg"
				/>
				</a>

		</section>
	)
}

export default BookShop;