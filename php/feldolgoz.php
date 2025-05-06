<?php
$ok = true;

// Adatok
$email = $_POST["email"] ?? "";
$nev = $_POST["nev"] ?? "";
$jelszo = $_POST["jelszo"] ?? "";
$kor = $_POST["kor"] ?? "";
$nem = $_POST["nem"] ?? "";

// Ellenőrzések
function ellenoriz($feltetel, $hibaUzenet) {
    global $ok;
    if (!$feltetel) {
        echo "$hibaUzenet<br>";
        $ok = false;
    }
}

// Validációk
ellenoriz(filter_var($email, FILTER_VALIDATE_EMAIL), "Hibás e-mail cím!");
ellenoriz(strlen($nev) >= 5 && strlen($nev) <= 30, "A név hossza 5 és 30 karakter között kell legyen!");
ellenoriz(strlen($jelszo) >= 6 && strlen($jelszo) <= 12, "A jelszó hossza 6 és 12 karakter között kell legyen!");
ellenoriz(is_numeric($kor) && $kor >= 18 && $kor <= 100, "A kor 18 és 100 között kell legyen!");
ellenoriz($nem == "Férfi" || $nem == "Nő", "A nem csak 'Férfi' vagy 'Nő' lehet!");

// Ha minden rendben, mentés adatbázisba
if ($ok) {
    $conn = mysqli_connect("localhost", "root", "", "zh");
    if (!$conn) {
        die("Kapcsolódási hiba: " . mysqli_connect_error());
    }

    $stmt = $conn->prepare("INSERT INTO regisztracio (email, nev, jelszo, kor, nem) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssds", $email, $nev, $jelszo, $kor, $nem);

    if ($stmt->execute()) {
        echo "<br><strong>Sikeres mentés az adatbázisba!</strong>";
    } else {
        echo "<br>Hiba mentéskor: " . $stmt->error;
    }

    $stmt->close();
    mysqli_close($conn);
}
?>
