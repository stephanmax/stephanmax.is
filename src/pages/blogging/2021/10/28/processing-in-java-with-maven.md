---
title: "Processing in Java with Maven"
time: 1635423833
tags: [ programming, java, processing ]
layout: ../../../../../layouts/BlogItemLayout.astro
---

I am currently attending a co-op program at the distance university called *Cooperative Algortihmic Art*. We are supposed to use [Processing](https://processing.org/)—**the** framework for creative coding—and while I adore Processing and its rich ecosystem it also means that I have to revisit the Java programming language.

And holy crap, my Java skills have become rusty.

Processing does come with its own [development environment](https://processing.org/environment/), but since we are tasked to not only create beautiful images but also a cooperative framework, there is no way around importing the Processing core library into a proper Java project inside a full-fledged IDE. (Although an IDE is of course completely optional, I want to mention that university students can use the powerful [IntelliJ IDEA](https://www.jetbrains.com/idea/) with a [free educational license](https://www.jetbrains.com/community/education/#students).)

A little research session on how to do just that revealed two articles:

* [Processing in Java](https://happycoding.io/tutorials/java/processing-in-java) on Happy Coding
* [How to use Processing 4 in external Java IDE](https://andrewmagid.com/Processing4-Java-IDE-Setup/) by Andrew Magid

In both posts the general approach is along the lines of:

1. Download Processing
2. Go into your IDE’s project settings and add Processing’s core library to the classpath
3. Overwrite the `PApplet` class and code away

This certainly works! However, I am collaborating with others on this project and was looking for a more robust project setup. I was particularly interested in solid dependency management and how to simplify the import of Processing’s core library for my fellow students.

Enter [Maven](https://maven.apache.org/)—the project management and build tool for Java.

Maven allows to manage and install dependencies via the `pom.xml` configuration file. Most popular libraries can be downloaded from public repositories, like MVN Repository. You can probably already imagine what the big catch is: The—[unofficial](https://github.com/processing/processing/issues/5666#issuecomment-426453307), mind you—Processing repository entry is [horribly out of date](https://mvnrepository.com/artifact/org.processing/core/3.3.6).

I soon realized I will need to add the library to our code repository to ensure that we all use the exact same version. (I considered the option to set up our own remote repository for a split second and then discarded it as overkill.) But how to install and handle a local library with Maven?

## The Solution

It turns out that there is an [elegant solution](https://stackoverflow.com/questions/2229757/maven-add-a-dependency-to-a-jar-by-relative-path/2230464#2230464) to this problem. First, declare a repository local to your project in the `pom.xml`:

```xml
<repositories>
  <repository>
    <id>mvn-repo</id>
    <url>file://${project.basedir}/mvn-repo</url>
  </repository>
</repositories>
```

Then install the Processing core library (make sure to change the `file` parameter to point to your local Processing download/installation) using Maven’s `install:install-file` and the `localRepositoryPath` parameter:

```shell
$ mvn install:install-file -Dfile=/Applications/Processing.app/Contents/Java/core/library/core.jar \\
    -DgroupId=org.processing -DartifactId=core -Dversion=3.5.4 -Dpackaging=jar \\
    -DlocalRepositoryPath=mvn-repo
```

And finally, declare the dependency like any other:

```xml
<dependency>
  <groupId>org.processing</groupId>
  <artifactId>core</artifactId>
  <version>3.5.4</version>
</dependency>
```

You only need to do this once. From now on, Maven will look for Processing inside the local repository and will find the version you have installed in step 2. This is my complete `pom.xml` for reference:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>de.fernuni-hagen.fapra-mci-01513</groupId>
  <artifactId>gruppe3</artifactId>
  <version>0.1</version>

  <repositories>
    <repository>
      <id>mvn-repo</id>
      <url>file://${project.basedir}/mvn-repo</url>
    </repository>
  </repositories>

  <properties>
    <maven.compiler.source>1.8</maven.compiler.source>
    <maven.compiler.target>1.8</maven.compiler.target>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  </properties>

  <dependencies>
    <dependency>
      <groupId>org.processing</groupId>
      <artifactId>core</artifactId>
      <version>3.5.4</version>
    </dependency>
  </dependencies>

</project>
```

Make sure to commit the `./mvn-repo` folder into your version control system and you should have a robust and reproducible build step around it.

## An Example Sketch

```java
import processing.core.PApplet;

public class ExampleSketch extends PApplet {

    public void settings() {
        size(1000, 1000);
    }

    public void setup() {
        background(50);
    }

    public void draw() {
        fill(255, 204, 0);
        ellipse(mouseX, mouseY, 50, 50);
    }

    public void mousePressed() {
        background(50);
    }

    public static void main(String[] args) {
        String[] processingArgs = {"ExampleSketch"};
        ExampleSketch sketch = new ExampleSketch();
        PApplet.runSketch(processingArgs, sketch);
    }
}
```

## Pitfalls

* Make sure your `.gitignore` does not mess with the installed libraries inside your local Maven repository. Committing `.jar` files into version control is not a best practice, but a necessary exception here. Let me know if you disagree and know a better way!
* Processing 3 [only supports Java 8](https://github.com/processing/processing/wiki/Supported-Platforms#java-versions). If that is a showstopper for you, consider using Processing 4 (still in beta, but supports Java 11).
* We do not have access to the color datatype inside sketches. (I found this [old forum conversation](https://forum.processing.org/two/discussion/18889/how-to-use-color-in-code-for-a-processing-library) on how to work around that, though.)
