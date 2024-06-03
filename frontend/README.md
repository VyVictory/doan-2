# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)






(mã sản phẩm, tên sản phẩm ,....)----> data sản phẩm
    (1, mì ,...)
    (2, bánh ,...)
    (3, mức ,...)
    (4, gạo ,...)

get(all)
------------------------ 
(mã người dùng, mã sản phẩm, số lượng)-----> data giỏ hàng(data gh)
    (001, 4 ,10 ,...)
    (002, 3 ,20 ,...)
    (001, 3 ,30 ,...)
    (005, 1 ,40 ,...)

set(mã người dùng(int), mã sản phẩm(int), số lượng)
--------
get(mã user)----trả về----> 1 API trên web như sau ---->(mã người dùng, mã sản phẩm, tên sản phẩm)
--------
delete(mã user)
-------- 
cập nhật lại giỏ hàng sẽ làm như vầy push chỉ update số lượng:
nếu bấm vào nút giảm số lượng đi thằng frontend sẽ gọi push(mã người dùng, mã sản phẩm, số lượng sản phẩm)

push(mã người dùng, mã sản phẩm, số lượng mới)
    if(mã người dùng === mã người dùng(data gh) AND mã sản phẩm === mã sản phẩm(data gh))
        { số lượng = số lượng mới(data gh), mã người dùng(data gh) === mã người dùng(data gh) , mã sản phẩm = mã sản phẩm(data gh)}

nghĩa là cập nhật lại số lượng 1 sản phẩm nào đó
-
thêm sản phẩm thì ez gọi set()
xóa sản phẩm của giỏ gọi delete sản phẩm đó
-----------------
  const [showList, setShowList] = useState(false);

  const handleMouseEnter = () => {
    setShowList(true);
  };

  const handleMouseLeave = () => {
    setShowList(false);
  };