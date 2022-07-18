import argparse, base64
from email.mime import base

def main():
    parser = argparse.ArgumentParser(description='Give me image')
    parser.add_argument('img_string', type=str)
    img_string = parser.parse_args().img_string
    
    img_data = base64.b64decode(img_string)
    
    with open('../media/temp.jpg', 'wb') as f:
        f.write(img_data)

if __name__ == '__main__':
    main()