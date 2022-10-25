<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Origin-Methods: * ");
header("Access-Control-Allow-Headers:Origin, X-Requested-With, Content-Type, Accept, Authorization");

abstract class ParentProduct{
	abstract public function products();
}

class Product extends ParentProduct{
	private $conn;

	public function __construct(){
	  $this->conn = mysqli_connect('localhost', 'root', '', 'product');
	  if(mysqli_connect_error()){
		die("Database Connection Failed" . mysqli_connect_error() . mysqli_connect_errno());
	  }
	}
	
	public function products(){
		$id='';
		$method=$_SERVER['REQUEST_METHOD'];
		switch($method){
		case "GET":
			if(isset($_GET['id'])){
			$id=$_GET['id'];
			}
			$sql="select * from product_list".($id ? "where id=$id":'');
		break;

		case "POST":
			$id=$_GET['id'];
			$sku=$_POST['sku'];
			$prodName=$_POST['prodName'];
			$price=$_POST['price'];
			$switcher=$_POST['switcher'];
			$size=$_POST['size'];
			$length=$_POST['length'];
			$height=$_POST['height'];
			$width=$_POST['width'];
			$weight=$_POST['weight'];

			$checkSKU="select sku from product_list";
			if(isset($_GET['delete'])){
			$delete=$_GET['delete'];
			$sql="DELETE FROM product_list WHERE id=$delete";
			}else{
			
			$sql="INSERT INTO product_list(sku,price,switcher,size,height,width,names,lengths,weights)
			VALUES('$sku','$price','$switcher','$size','$height','$width','$prodName','$length','$weight')";
			
		}
		break;

		
		}

		$result=mysqli_query($this->conn,$sql);
		if(!$result){
		http_response_code(404);
		die(mysqli_error($this->conn));
		}

		if($method == 'GET'){
		echo '[';
		for($id=0;$id < mysqli_num_rows($result);$id++){
			echo ($id > 0 ? ',': '').json_encode(mysqli_fetch_object($result));
		}
		echo ']';
		}else{
		echo mysqli_affected_rows($this->conn);
		}
	}
}

$prod=new Product();
$prod->products();