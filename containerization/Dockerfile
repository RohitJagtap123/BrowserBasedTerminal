FROM ubuntu:latest

# Update and install all needed packages
RUN apt update && apt install -y python3

# Create restricted user and symlink only required binaries
RUN useradd -m user && \
    echo 'user:password' | chpasswd && \
    mkdir /home/user/bin && \
    ln -s /usr/bin/python3 /home/user/bin/python3

# Set restricted PATH and sudo
RUN echo "PATH=/home/user/bin" >> /home/user/.bash_profile && \
    echo "user ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# Set restricted shell
RUN chsh -s /bin/rbash user

# Default command
CMD ["su", "-", "user"]
