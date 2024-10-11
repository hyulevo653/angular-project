const apiUrl = 'http://localhost:3000/api/'

export class ApiConstant {
    public static Login = apiUrl.concat('login');
    public static Search = apiUrl.concat('product-search');
    public static GetUser = apiUrl.concat('get-all-user');
}