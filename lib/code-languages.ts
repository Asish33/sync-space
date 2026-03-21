export const LANGUAGES = [
  { value: "javascript", label: "JavaScript", judgeId: 63 },
  { value: "typescript", label: "TypeScript", judgeId: 74 },
  { value: "python", label: "Python", judgeId: 71 },
  { value: "java", label: "Java", judgeId: 62 },
  { value: "cpp", label: "C++", judgeId: 54 },
  { value: "c", label: "C", judgeId: 50 },
  { value: "go", label: "Go", judgeId: 60 },
  { value: "rust", label: "Rust", judgeId: 73 },
];

export const STARTER_CODE: Record<string, string> = {
  javascript: `// JavaScript Starter
function greet(name) {
  return \`Hello, \${name}! Welcome to the code editor.\`;
}

console.log(greet("World"));
`,
  typescript: `// TypeScript Starter
function greet(name: string): string {
  return \`Hello, \${name}! Welcome to the code editor.\`;
}

console.log(greet("World"));
`,
  python: `# Python Starter
def greet(name: str) -> str:
    return f"Hello, {name}! Welcome to the code editor."

if __name__ == "__main__":
    print(greet("World"))
`,
  java: `// Java Starter
public class Main {
    public static void main(String[] args) {
        System.out.println(greet("World"));
    }

    public static String greet(String name) {
        return "Hello, " + name + "! Welcome to the code editor.";
    }
}
`,
  cpp: `// C++ Starter
#include <iostream>
#include <string>

std::string greet(const std::string& name) {
    return "Hello, " + name + "! Welcome to the code editor.";
}

int main() {
    std::cout << greet("World") << std::endl;
    return 0;
}
`,
  c: `// C Starter
#include <stdio.h>

void greet(const char* name) {
    printf("Hello, %s! Welcome to the code editor.\\n", name);
}

int main() {
    greet("World");
    return 0;
}
`,
  go: `// Go Starter
package main

import "fmt"

func greet(name string) string {
	return fmt.Sprintf("Hello, %s! Welcome to the code editor.", name)
}

func main() {
	fmt.Println(greet("World"))
}
`,
  rust: `// Rust Starter
fn greet(name: &str) -> String {
    format!("Hello, {}! Welcome to the code editor.", name)
}

fn main() {
    println!("{}", greet("World"));
}
`,
};
