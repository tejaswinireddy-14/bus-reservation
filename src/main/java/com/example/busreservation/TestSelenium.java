package com.example.busreservation;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;


public class TestSelenium {
    public static void main(String[] args) {
        System.setProperty("webdriver.chrome.driver", "C:\\Users\\tejaswini.g\\Downloads\\busbooking\\busbooking\\src\\test\\java\\chromedriver.exe");


        WebDriver driver = new ChromeDriver();


        driver.get("http://localhost:3000");
        driver.manage().window().maximize();
        try {
            driver.findElement(By.xpath("//*[@id=\"Admin Login\"]")).click();
            driver.findElement(By.xpath("//*[@id=\"menu-\"]/div[3]/ul/ul/a[1]")).click();
            Thread.sleep(2000);

//
            driver.findElement(By.xpath("//*[@id=\"filled-email-input\"]")).sendKeys("g.tejaswini1421@gmail.com");
            driver.findElement(By.xpath("//*[@id=\"filled-password-input\"]")).sendKeys("12345");
            driver.findElement(By.xpath("//*[@id=\"root\"]/div/form/div[4]/button")).click();
            Thread.sleep(2000);

            WebElement u1 = driver.findElement(By.xpath("//*[@id=\"origin\"]"));

//            WebElement u2 = driver.findElement(By.id("destination"));
            u1.click();
            driver.findElement(By.xpath("//*[@id=\"menu-\"]/div[3]/ul/li[1]")).click();

            WebElement u2 = driver.findElement(By.id("destination"));
            u2.click();
            driver.findElement(By.xpath("//*[@id=\"menu-\"]/div[3]/ul/li[3]")).click();

//
           WebElement ele = driver.findElement(By.xpath("//*[@id=\":r2:\"]"));
           ele.click();
           ele.sendKeys("08302022");
            driver.findElement(By.xpath("//*[@id=\"root\"]/div/form/div[2]/button")).click();
            Thread.sleep(2000);


         driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/table/tbody/tr/td[4]/a/button")).click();
            Thread.sleep(2000);

            driver.findElement(By.id("seat-10")).click();
            driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/button")).click();
            Thread.sleep(2000);
            driver.findElement(By.xpath("//*[@id=\"filled-name-input\"]")).sendKeys("tom");
            driver.findElement(By.xpath("//*[@id=\"filled-password-input\"]")).sendKeys("21");

            driver.findElement(By.xpath("//*[@id=\"root\"]/div/form/div[1]/div[3]/div/label[1]/span[1]/input")).click();
            driver.findElement(By.xpath("//*[@id=\"filled-email-input\"]")).sendKeys("g.tejaswini1421@gmail.com");
            driver.findElement(By.xpath("//*[@id=\"root\"]/div/form/div[3]/a/button")).click();
            Thread.sleep(1000);



        } catch (Exception e) {
            throw new RuntimeException(e);
        }


    }

}
