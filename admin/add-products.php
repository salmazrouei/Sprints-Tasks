<?php
define('BASE_PATH', '../');
require_once(BASE_PATH . 'logic/products.php');
require_once(BASE_PATH . 'layouts\header.php');
$products = getProducts();
?>
<div class="container-fluid">

    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Admin Profile</h6>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                    <thead class="thead-dark">
                        <tr>
                            <th> ID </th>
                            <th> Product Name </th>
                            <th> Description </th>
                            <th> image </th>
                            <th> price </th>
                            <th> Discount </th>
                            <th> buttons</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <form action="<?php BASE_PATH . 'data/products' ?>" method="post" enctype="multipart/form-data">
                            <td><input type="text" name="" id=""></td>
                            <td><input type="text" name="product-name"></td>
                            <td><input type="text" name="description"></td>                          
                            <td><input type="file" id="myFile" name="filename"></td>
                            <td><input type="text" name="price"></td>
                            <td><input type="text" name="discount"></td>
                            <td><button type="submit" class="btn btn-primary">Add</button></td>

                            </form>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    </div>

</div>
<?php
require_once(BASE_PATH . 'layouts\footer.php');