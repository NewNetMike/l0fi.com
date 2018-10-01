import os, fnmatch
def findReplace(directory, find, replace, filePattern):
    for path, dirs, files in os.walk(os.path.abspath(directory)):
        for filename in fnmatch.filter(files, filePattern):
            filepath = os.path.join(path, filename)
            with open(filepath, encoding="utf8") as f:
                s = f.read()
            s = s.replace(find, replace)
            with open(filepath, "w", encoding="utf8") as f:
                f.write(s)
                
findReplace(".", "http://", "https://", "*.html")
findReplace(".", 'href=""', 'href="https://webbeneur.com"', "*.html")