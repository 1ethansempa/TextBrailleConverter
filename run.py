from BrailleConverter import CreateApp

Braille = CreateApp()

if __name__ == "__main__":
    Braille.run(host="0.0.0.0", port="5000", debug=True)